"use client"
import { useState } from "react";

export function ContactUs() {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a delay for 2 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

    return (
    <div>
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="lg:mb-0 mb-10">
                        <div className="group w-full h-full">
                            <div className="relative h-full">
                                <img src="https://pagedone.io/asset/uploads/1696488602.png" alt="ContactUs tailwind section" className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-cyan-700 object-cover"/>
                                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contact us</h1>
                                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                    <div className="bg-white rounded-lg p-6 block">
                                        <a href="javascript:;" className="flex items-center mb-6">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <h5 className="text-black text-base font-normal leading-6 ml-5">470-601-1911</h5>
                                        </a>
                                        <a href="javascript:;" className="flex items-center mb-6">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            <h5 className="text-black text-base font-normal leading-6 ml-5">Pagedone1234@gmail.com</h5>
                                        </a>
                                        <a href="javascript:;" className="flex items-center">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z" stroke="#0891b2" strokeWidth="2"/>
                                                <path d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z" stroke="#0891b2" strokeWidth="2"/>
                                            </svg>
                                            <h5 className="text-black text-base font-normal leading-6 ml-5">654 Sycamore Avenue, Meadowville, WA 76543</h5>
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-center border-t border-gray-100 pt-6">
                                        <a href="javascript:;" className="mr-6">
                                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.0683594" width="30" height="30" rx="15" fill="#337FFF"></rect>
                                                <path d="M18.5094 15.937L18.9369 13.2236H16.3038V11.4599C16.3038 10.7179 16.6714 9.99293 17.8469 9.99293H19.0608V7.68231C18.3539 7.56968 17.6396 7.50874 16.9236 7.5C14.7565 7.5 13.3417 8.80158 13.3417 11.1546V13.2236H10.9395V15.937H13.3417V22.5H16.3038V15.937H18.5094Z" fill="white"></path>
                                            </svg>
                                        </a>
                                        <a href="javascript:;" className="mr-6">
                                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.0683594" width="30" height="30" rx="15" fill="url(#paint0_linear_11773_24443)"></rect>
                                                <path d="M12.2692 14.9998C12.2692 13.4919 13.492 12.2692 15.0008 12.2692C16.5096 12.2692 17.733 13.4919 17.733 14.9998C17.733 16.5077 16.5096 17.7304 15.0008 17.7304C13.492 17.7304 12.2692 16.5077 12.2692 14.9998ZM10.7922 14.9998C10.7922 17.3228 12.6764 19.2059 15.0008 19.2059C17.3252 19.2059 19.2094 17.3228 19.2094 14.9998C19.2094 12.6768 17.3252 10.7937 15.0008 10.7937C12.6764 10.7937 10.7922 12.6768 10.7922 14.9998ZM18.3925 10.6269C18.3924 10.8213 18.45 11.0114 18.558 11.1731C18.666 11.3348 18.8196 11.4608 18.9993 11.5353C19.1789 11.6098 19.3767 11.6293 19.5675 11.5915C19.7583 11.5536 19.9336 11.4601 20.0712 11.3226C20.2088 11.1852 20.3025 11.0101 20.3406 10.8195C20.3786 10.6288 20.3592 10.4312 20.2848 10.2515C20.2104 10.0719 20.0844 9.91833 19.9227 9.81026C19.7611 9.70219 19.5709 9.64446 19.3764 9.64438H19.376C19.1153 9.6445 18.8652 9.74805 18.6808 9.93228C18.4964 10.1165 18.3927 10.3663 18.3925 10.6269ZM11.6896 21.6672C10.8905 21.6308 10.4561 21.4978 10.1675 21.3854C9.78486 21.2366 9.51183 21.0592 9.22477 20.7727C8.93771 20.4862 8.76002 20.2136 8.6117 19.8312C8.49918 19.5429 8.36608 19.1087 8.32975 18.3101C8.29002 17.4467 8.28208 17.1873 8.28208 14.9998C8.28208 12.8124 8.29067 12.5538 8.32975 11.6896C8.36614 10.891 8.50023 10.4577 8.6117 10.1685C8.76067 9.78606 8.9381 9.51319 9.22477 9.22631C9.51143 8.93942 9.7842 8.76183 10.1675 8.6136C10.456 8.50116 10.8905 8.36813 11.6896 8.33183C12.5535 8.29212 12.813 8.28419 15.0008 8.28419C17.1886 8.28419 17.4483 8.29277 18.313 8.33183C19.1121 8.3682 19.5457 8.5022 19.835 8.6136C20.2177 8.76183 20.4907 8.93981 20.7778 9.22631C21.0649 9.5128 21.2419 9.78606 21.3909 10.1685C21.5034 10.4568 21.6365 10.891 21.6728 11.6896C21.7125 12.5538 21.7205 12.8124 21.7205 14.9998C21.7205 17.1873 21.7125 17.4459 21.6728 18.3101C21.6364 19.1087 21.5027 19.5427 21.3909 19.8312C21.2419 20.2136 21.0645 20.4865 20.7778 20.7727C20.4911 21.059 20.2177 21.2366 19.835 21.3854C19.5465 21.4979 19.1121 21.6309 18.313 21.6672C17.4491 21.7069 17.1895 21.7149 15.0008 21.7149C12.812 21.7149 12.5532 21.7069 11.6896 21.6672ZM11.6217 6.8582C10.7492 6.89791 10.153 7.03618 9.63228 7.23866C9.09304 7.44777 8.63655 7.7283 8.18039 8.18347C7.72422 8.63864 7.44425 9.09557 7.23502 9.63449C7.03241 10.1552 6.89406 10.7507 6.85432 11.6227C6.81393 12.4961 6.80469 12.7753 6.80469 14.9998C6.80469 17.2242 6.81393 17.5035 6.85432 18.3768C6.89406 19.2489 7.03241 19.8444 7.23502 20.3651C7.44425 20.9037 7.72429 21.3611 8.18039 21.8161C8.63648 22.2711 9.09304 22.5512 9.63228 22.7609C10.1539 22.9634 10.7492 23.1017 11.6217 23.1414C12.4961 23.1811 12.775 23.191 15.0008 23.191C17.2266 23.191 17.506 23.1817 18.3799 23.1414C19.2525 23.1017 19.8483 22.9634 20.3693 22.7609C20.9082 22.5512 21.365 22.2713 21.8212 21.8161C22.2774 21.3609 22.5567 20.9037 22.7666 20.3651C22.9692 19.8444 23.1082 19.2488 23.1473 18.3768C23.187 17.5028 23.1962 17.2242 23.1962 14.9998C23.1962 12.7753 23.187 12.4961 23.1473 11.6227C23.1075 10.7507 22.9692 10.1549 22.7666 9.63449C22.5567 9.0959 22.2766 8.63936 21.8212 8.18347C21.3658 7.72758 20.9082 7.44777 20.37 7.23866C19.8483 7.03618 19.2524 6.89726 18.3805 6.8582C17.5066 6.81849 17.2272 6.80859 15.0014 6.80859C12.7756 6.80859 12.4961 6.81783 11.6217 6.8582Z" fill="white"></path>
                                                <defs>
                                                <linearGradient id="paint0_linear_11773_24443" x1="29.4918" y1="30" x2="-0.50824" y2="-8.07516e-07" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FBE18A"></stop>
                                                    <stop offset="0.21" stopColor="#FCBB45"></stop>
                                                    <stop offset="0.38" stopColor="#F75274"></stop>
                                                    <stop offset="0.52" stopColor="#D53692"></stop>
                                                    <stop offset="0.74" stopColor="#8F39CE"></stop>
                                                    <stop offset="1" stopColor="#5B4FE9"></stop>
                                                </linearGradient>
                                                </defs>
                                            </svg>
                                        </a>
                                        <a href="javascript:;" className="mr-6">
                                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.884766" width="30" height="30" rx="15" fill="#33CCFF"></rect>
                                                <path d="M23.5888 10.2039C23.0935 10.4171 22.5727 10.5655 22.0394 10.6456C22.2888 10.6028 22.6556 10.154 22.8017 9.97236C23.0235 9.69835 23.1926 9.38555 23.3003 9.04985C23.3003 9.02491 23.3253 8.9893 23.3003 8.97149C23.2878 8.96463 23.2737 8.96103 23.2594 8.96103C23.2451 8.96103 23.231 8.96463 23.2184 8.97149C22.6393 9.28508 22.023 9.52442 21.3841 9.68385C21.3618 9.69066 21.3381 9.69127 21.3155 9.68562C21.2929 9.67997 21.2723 9.66828 21.2558 9.6518C21.2061 9.59257 21.1526 9.53665 21.0956 9.48439C20.8349 9.25089 20.5393 9.05979 20.2193 8.91806C19.7875 8.74088 19.321 8.66415 18.8552 8.69366C18.4031 8.72221 17.9618 8.84345 17.5586 9.04985C17.1616 9.26745 16.8127 9.56306 16.5328 9.91894C16.2384 10.2852 16.0259 10.7103 15.9095 11.1656C15.8135 11.5986 15.8027 12.0462 15.8775 12.4835C15.8775 12.5583 15.8775 12.5689 15.8133 12.5583C13.2738 12.1843 11.1901 11.2831 9.48752 9.34904C9.41272 9.26356 9.37354 9.26356 9.31299 9.34904C8.57213 10.4746 8.93187 12.2555 9.85795 13.1353C9.98261 13.2528 10.1108 13.3668 10.2462 13.4737C9.82159 13.4435 9.40736 13.3284 9.02804 13.1353C8.9568 13.089 8.91762 13.1139 8.91406 13.1994C8.90397 13.3179 8.90397 13.4371 8.91406 13.5556C8.98838 14.1235 9.21222 14.6616 9.56267 15.1147C9.91313 15.5678 10.3776 15.9197 10.9087 16.1343C11.0381 16.1898 11.173 16.2316 11.3112 16.259C10.9181 16.3364 10.515 16.3484 10.118 16.2946C10.0325 16.2768 10.0004 16.3231 10.0325 16.405C10.5561 17.8298 11.6923 18.2643 12.5258 18.5065C12.6397 18.5243 12.7537 18.5243 12.882 18.5528C12.882 18.5528 12.882 18.5528 12.8606 18.5742C12.6148 19.023 11.6211 19.3258 11.1651 19.4825C10.333 19.7814 9.44574 19.8956 8.565 19.8173C8.42609 19.7959 8.39403 19.7995 8.35842 19.8173C8.3228 19.8351 8.35842 19.8743 8.3976 19.9099C8.57569 20.0274 8.75378 20.1307 8.939 20.2305C9.49038 20.5312 10.0733 20.7701 10.6772 20.9428C13.8045 21.8048 17.3236 21.1708 19.6708 18.8378C21.5158 17.007 22.1641 14.4817 22.1641 11.9527C22.1641 11.8566 22.2816 11.7996 22.3493 11.7497C22.8161 11.386 23.2276 10.9565 23.571 10.4746C23.6305 10.4027 23.661 10.3113 23.6565 10.2181C23.6565 10.1647 23.6565 10.1754 23.5888 10.2039Z" fill="white"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl" onSubmit={handleSubmit}>
                        <h2 className="text-cyan-600 font-manrope text-4xl font-semibold leading-10 mb-11">Send Us A Message</h2>
                        
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
                            placeholder="Name" 
                        />
                        
                        <input 
                            type="text" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
                            placeholder="Email" 
                        />
                        
                        <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            className="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" 
                            placeholder="Phone" 
                        />
                        
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            className="w-full h-24 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none pl-4 mb-10 py-3" 
                            placeholder="Message"
                        ></textarea>
                        
                        <button 
                            type="submit"
                            className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-cyan-800 bg-cyan-600 shadow-sm"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Send"}
                        </button>
                        </form>
                </div>
            </div>
        </section>                                       
    </div>
    )
}