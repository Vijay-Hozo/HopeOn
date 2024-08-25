import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear(); 
  const links = [
    {
      id: 1,
      heading: "ABOUT",
      list: [
        "Contact us",
        "About us",
        "Careers",
        "Security & Compliance",
      ]
    },
    {
      id: 3,
      heading: "CONTACT",
      list: [
        "vijay2304a@gmail.com",
        "+91 8838725310",
        "https://avijay.tech/",
        "https://github.com/Vijay-Hozo",
        "https://www.linkedin.com/in/mr-vijay/",
      ]
    },
    {
      id: 4,
      heading: "HELP",
      list: [
        "FAQ",
        "Cookie Policy",
        "Privacy Policy",
        "Terms of Service",
        "Cancellation Policy",
      ]
    },
  ];

  return (
    <div className="bg-blue-900 text-white p-4 w-full">
      <ul className='flex flex-col md:flex-row justify-between m-3'>
        {links.map(({ id, heading, list }) => 
        (
          <li 
            key={id} 
            className="mb-4 md:mb-0">
            <h1 className='text-yellow-400 font-semibold'>{heading}</h1>

            <ul className="ml-4">
              {list.map((item, index) => (
                <li 
                    key={index} 
                    className="mb-1">
                    <a href={`${item}`} className="hover:text-yellow-500">{item}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center mt-4">
        <h1>
          <a href="#" className="hover:underline">© All Rights Reserved {year}</a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
