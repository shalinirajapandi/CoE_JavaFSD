import "../scss/image.scss";
import offer from "../asserts/offer.png";
import shoe from "../asserts/shoe.png";
import shipping from "../asserts/shipping.png";
import exchange from "../asserts/exchange.png";
import support from "../asserts/support.png";
import Image from "../components/Image";
import ServiceContent from "../components/ServiceContent";

export default function OfferPage() {
  return (
    <div className="flex justify-between h-1/2 m-4 border rounded-lg shadow bg-gray-100 font-mono" >
      <Image source={shoe} className="w-[450px] h-[600px] p-4 m-2" />
      <div className="flex flex-col gap-20 p-10 m-4">
        <ServiceContent
          title="Free Shipping"
          subTitle="Free Shipping for orders"
          description="over ₹ 500 on prepaid"
        />
        <ServiceContent
          title="Hassle Free Exchange"
          subTitle="Exchange on your purchase"
          description="7 days from delivery"
        />
        <ServiceContent
          title="24x7 Online Support"
          subTitle="Talk to our support team on"
          description="any questions"
        />
      </div>
      <div className="flex flex-col gap-8 p-6 m-5">
        <Image source={shipping} className="h-40 w-40" variant="service" />
        <Image source={exchange} className="h-40 w-40" variant="service" />
        <Image source={support} className="h-40 w-40" variant="service" />
      </div>
      <div className="flex items-center">
        <Image source={offer} className="w-[450px] h-[600px] p-4" />
      </div>
    </div>
  );
}
