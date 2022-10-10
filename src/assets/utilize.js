import { client } from "..";

export async function getCurrency(query) {
  return await client
    .query({ query: query })
    .then((response) => response.data.currencies);
}
export async function getAllCategories(query) {
  return await client
    .query({ query: query })
    .then((response) => response.data.categories);
}

export async function calcQuantity(products) {
  const quantitiesArray = await products.map((item) => item.quantity);
  const totalQuantity = quantitiesArray.reduce(
    (acc, current) => acc + current,
    0
  );
  return totalQuantity;
}
export async function getProductQuantity(id, products) {
  const newObj = products.find((item) => item.uniqId === id);
  const quantity = newObj.quantity;
  return await quantity;
}
export function uniqId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function passProductToCart(props) {
  const { gallery, attributes, brand, name, prices, id, inStock } =
    props.PDPProduct;
  const { products, constAttributes, deleteAttributes } = props;
  const checkOptions = attributes.length === constAttributes.length;

  const order = {
    gallery,
    attributes,
    brand,
    name,
    prices,
    id,
    quantity: 1,
    selectedAttributes: constAttributes,
    uniqId: uniqId(),
  };
  const check = products.find(
    (item) =>
      item.id === order.id &&
      JSON.stringify(item.selectedAttributes) ===
        JSON.stringify(constAttributes)
  );
  if (inStock && checkOptions) {
    if (check) {
      const { uniqId, quantity } = check;
      props.addQuantity(uniqId, quantity + 1);
      deleteAttributes();
      return { message: "" };
    } else {
      props.addToCart(order);
      deleteAttributes();
      return { message: "" };
    }
  } else if (!inStock) {
    return { message: "This product out ot stock" };
  } else if (!checkOptions) {
    return { message: "you didn't select options" };
  }
}
