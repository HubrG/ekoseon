import { Products } from "@/src/feature/layout/ecommerce/Products";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import Loading from './loading';


export default function pricing() {

  // On converti le "price" (Decimal) en String
  

  return (
    <PageTransition>
      <section className=" relative z-0  ">
        <div className="content max-w-xl">
          <h1>test</h1>
            <Products  />
        </div>
      </section>
    </PageTransition>
  );
}
