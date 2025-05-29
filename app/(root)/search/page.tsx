import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import PriceFilter from "./price-filter";
import { Button } from "@/components/ui/button";

//-----------------
// const prices = [
//   {
//     name: "$1 to $50",
//     value: "1-50",
//   },
//   {
//     name: "$51 to $100",
//     value: "51-100",
//   },
//   {
//     name: "$101 to $150",
//     value: "101-150",
//   },
// ];
//-----------------
const ratings = [4, 3, 2, 1];

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    p,
    r,
    s,
    pg,
  }: {
    c?: string;
    p?: string;
    r?: string;
    s?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}
        <div className="text-xl mb-2 mt-8">Categories</div>
        <div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                className={`${
                  (category === "all" || category === "") && "font-bold"
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Links */}
        <div className="text-xl mb-2 mt-8">Price</div>
        <PriceFilter />

        {/* Rating Links */}
        <div className="text-xl mb-2 mt-8">Customer Ratings</div>
        <div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                className={`${rating === "all" && "font-bold"}`}
                href={getFilterUrl({ r: "all" })}
              >
                Any
              </Link>
            </li>
            {ratings.map((x) => (
              <li key={x}>
                <Link
                  className={`${rating === x.toString() && "font-bold"}`}
                  href={getFilterUrl({ r: `${x}` })}
                >
                  {`${x} stars & up`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col md:flex-row my-4">
          <div className="flex items-center text-sm">
            <i>
              {q !== "all" && q !== "" && "Query: " + q}
              {category !== "all" &&
                category !== "" &&
                " Category: " + category}
              {price !== "all" && " Price: " + price}
              {rating !== "all" && " Rating: " + rating + " stars & up"}
            </i>
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            price !== "all" ||
            rating !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href={"/search"}>Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>{/* SORT */}</div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length <= 0 && <div>No product found</div>}
          {products.data.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
