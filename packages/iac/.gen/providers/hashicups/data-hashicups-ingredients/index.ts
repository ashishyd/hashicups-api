// https://www.terraform.io/docs/providers/hashicups/d/ingredients
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataHashicupsIngredientsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/hashicups/d/ingredients#coffee_id DataHashicupsIngredients#coffee_id}
  */
  readonly coffeeId: number;
  /**
  * Docs at Terraform Registry: {@link https://www.terraform.io/docs/providers/hashicups/d/ingredients#id DataHashicupsIngredients#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
}
export interface DataHashicupsIngredientsIngredients {
}

export function dataHashicupsIngredientsIngredientsToTerraform(struct?: DataHashicupsIngredientsIngredients): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataHashicupsIngredientsIngredientsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataHashicupsIngredientsIngredients | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataHashicupsIngredientsIngredients | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getNumberAttribute('id');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // quantity - computed: true, optional: false, required: false
  public get quantity() {
    return this.getNumberAttribute('quantity');
  }

  // unit - computed: true, optional: false, required: false
  public get unit() {
    return this.getStringAttribute('unit');
  }
}

export class DataHashicupsIngredientsIngredientsList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DataHashicupsIngredientsIngredientsOutputReference {
    return new DataHashicupsIngredientsIngredientsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://www.terraform.io/docs/providers/hashicups/d/ingredients hashicups_ingredients}
*/
export class DataHashicupsIngredients extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "hashicups_ingredients";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://www.terraform.io/docs/providers/hashicups/d/ingredients hashicups_ingredients} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataHashicupsIngredientsConfig
  */
  public constructor(scope: Construct, id: string, config: DataHashicupsIngredientsConfig) {
    super(scope, id, {
      terraformResourceType: 'hashicups_ingredients',
      terraformGeneratorMetadata: {
        providerName: 'hashicups',
        providerVersion: '0.3.3'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._coffeeId = config.coffeeId;
    this._id = config.id;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // coffee_id - computed: false, optional: false, required: true
  private _coffeeId?: number; 
  public get coffeeId() {
    return this.getNumberAttribute('coffee_id');
  }
  public set coffeeId(value: number) {
    this._coffeeId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get coffeeIdInput() {
    return this._coffeeId;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // ingredients - computed: true, optional: false, required: false
  private _ingredients = new DataHashicupsIngredientsIngredientsList(this, "ingredients", false);
  public get ingredients() {
    return this._ingredients;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      coffee_id: cdktf.numberToTerraform(this._coffeeId),
      id: cdktf.stringToTerraform(this._id),
    };
  }
}
