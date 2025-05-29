import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ViewAllProductsButton from "@/components/view-all-products-button";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featureProducts = await getFeaturedProducts();

  return (
    <>
      {featureProducts.length > 0 && <ProductCarousel data={featureProducts} />}
      <ProductList data={latestProducts} title="Newest Arrivals" />
      <ViewAllProductsButton />
    </>
  );
};

export default Homepage;
