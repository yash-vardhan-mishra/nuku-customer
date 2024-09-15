import React from "react";
import { useDatabase } from "../../contexts/DatabaseContext";

import ProductCard from "../Utilities/ProductCard";

const CallToAction = () => {
  const { data } = useDatabase();

  return (
    <>
      <section className="container mx-auto">
        <div>
          <div className="my-6">
            <h2 className="text-lg font-bold uppercase">
              Products
            </h2>
          </div>
          <section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {Array.isArray(data) && data?.length ? data.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <ProductCard index={index} product={product} />
                  </React.Fragment>
                );
              }) : null}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
