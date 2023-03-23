import { App, TerraformStack } from 'cdktf';
import { Construct } from 'constructs';
import * as fs from 'fs';
import { DataHashicupsCoffees } from './.gen/providers/hashicups/data-hashicups-coffees';
import { DataHashicupsIngredients } from './.gen/providers/hashicups/data-hashicups-ingredients';
import { DataHashicupsOrder } from './.gen/providers/hashicups/data-hashicups-order';
import { Order } from './.gen/providers/hashicups/order';
import { HashicupsProvider } from './.gen/providers/hashicups/provider';
import { ItemQuantity } from './interfaces/item_quantity';
import { FileUtils } from './utils/file_utils';
import dotenv from 'dotenv';
dotenv.config({ path: './../../.env' });

class YAppStack extends TerraformStack {
  /**
   * We are reading the `Orders` folder recursively, and for each order we are creating a
   * `DataHashicupsOrder` resource, and for each order item we are creating a `DataHashicupsCoffees`
   * and `DataHashicupsIngredients` resources
   * @param {Construct} scope - Construct
   * @param {string} id - The ID of the resource.
   */
  constructor(scope: Construct, id: string) {
    super(scope, id);

    /* Reading the `Orders` folder recursively, and for each order we are creating a
       * `DataHashicupsOrder` resource, and for each order item we are creating a
    `DataHashicupsCoffees`
       * and `DataHashicupsIngredients` resources */
    const folderPaths = FileUtils.readDirRecursive(
      `./../../${process.env.HASHICUPS_ORDERS_FOLDER_NAME || 'Orders'}`
    );

    /* Creating a `HashicupsProvider` resource, which is a provider for the Hashicups API. */
    const hashicupsProvider = new HashicupsProvider(this, 'hashicups', {
      username: process.env.HASHICUPS_USERNAME || 'yassir_user',
      password: process.env.HASHICUPS_PASSWORD || 'test@123',
      host: process.env.HASHICUPS_HOST || 'http://localhost:19090',
    });

    folderPaths.forEach((path) => {
      if (path.level === 0) {
        const names = path.name.split('-');
        /* Creating a `DataHashicupsOrder` resource, which is a data source for the Hashicups API. */
        new DataHashicupsOrder(this, 'order-data-' + names[1], {
          provider: hashicupsProvider,
          id: +names[1] ?? 1,
        });
        const orderItems = {
          items: path.items
            .filter((item) => item.level > 0 && item.isFile)
            .map((item, index) => {
              const coffeeId = item.name;
              const jsonQuantity = fs.readFileSync(item.path, 'utf8');
              const jsonQuantityData = <ItemQuantity>JSON.parse(jsonQuantity);
              /* Creating a `DataHashicupsCoffees` and `DataHashicupsIngredients` resources for each
             order item. */
              new DataHashicupsCoffees(this, `${path.name}-coffee-${index}`, {
                provider: hashicupsProvider,
              });
              new DataHashicupsIngredients(
                this,
                `${path.name}-ingredient-${index}`,
                {
                  provider: hashicupsProvider,
                  coffeeId: +coffeeId,
                }
              );

              return {
                coffee: { id: +coffeeId },
                quantity: jsonQuantityData.quantity,
              };
            }),
        };

        new Order(this, path.name, {
          provider: hashicupsProvider,
          ...orderItems,
        });
      }
    });
  }
}

const app = new App();
const yApp = new YAppStack(app, 'yassir-platform-challenge');
yApp.toTerraform();
app.synth();
