import { CustomButton } from "./hero";

export function AboutUsShort() {

    return (
        <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                <div
                    className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                    <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                        <img className=" rounded-xl object-cover" src="/about-us-1.webp" alt="about Us image" />
                    </div>
                    <img className="sm:ml-0 ml-auto rounded-xl object-cover" src="/about-us-2.webp"
                        alt="about Us image" />
                </div>
                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-center items-start gap-8 flex">
                        <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                            <h2
                                className="text-forefround text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                Empowering Your Tech Journey</h2>
                            <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                            At DeviceHaven, we bring the latest and most reliable devices right to your fingertips. Our mission is to make technology accessible, affordable, and tailored to your needs. From smartphones to smart gadgets, we are your trusted partner in discovering the best innovations for your lifestyle.</p>
                        </div>
                        <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                            <div className="flex-col justify-start items-start inline-flex">
                                <h3 className="text-foreground text-4xl font-bold font-manrope leading-normal">100K+</h3>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Customers</h6>
                            </div>
                            <div className="flex-col justify-start items-start inline-flex">
                                <h4 className="text-foreground text-4xl font-bold font-manrope leading-normal">125+</h4>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Brands Available</h6>
                            </div>
                            <div className="flex-col justify-start items-start inline-flex">
                                <h4 className="text-foreground text-4xl font-bold font-manrope leading-normal">95%</h4>
                                <h6 className="text-gray-500 text-base font-normal leading-relaxed">Customer Satisfaction Rate</h6>
                            </div>
                        </div>
                    </div>
                    <CustomButton url="/about-us">
                        Read More
                    </CustomButton>
                </div>
            </div>
        </div>
    </section>
                                            
    )
}