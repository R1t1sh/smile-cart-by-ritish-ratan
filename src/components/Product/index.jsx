import { useState, useEffect } from "react";

import productsApi from "apis/products";
import PageNotFound from "components/ProductList";
import { LeftArrow } from "neetoicons";
import { Typography, Spinner } from "neetoui";
import { isNotNil, append } from "ramda";
import { useParams, useHistory } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  // const transformResponseKeysToCamelCase = response => {
  //   if (response.data) response.data = keysToCamelCase(response.data);
  // };

  const { slug } = useParams();
  const fetchProduct = async () => {
    try {
      // const response = await productsApi.show();
      // setProduct(response.data);
      const response = await productsApi.show(slug);

      setProduct(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isError) return <PageNotFound />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;

  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div className="flex items-center">
        {
          //TODO :CHANGED
        }
        <LeftArrow
          className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
          onClick={history.goBack}
        />
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
        <hr className="neeto-ui-border-black border-2" />
      </div>
      <div className="mt-16 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            {" "}
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {" "}
            {discountPercentage}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
