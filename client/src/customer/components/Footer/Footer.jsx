import React from "react";
import { BsArrowUpShort } from "react-icons/bs";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <>
      <div className="text text-white">
        <div className="p-1 cursor-pointer flex justify-center items-center bg-[#2b65b6]" onClick={()=>{
            window.scrollTo({top:0,left:0,behavior:'smooth'})
          }}>
          <h3>Back to top</h3>
          <BsArrowUpShort size={30} />
        </div>

        <div className="bg-[#031020]">
          <div className="paddings flex justify-between flex-wrap md:justify-evenly">
            <div className="mt-5">
              <ul>
                <li className="my-3 font-medium">Get to Know Us</li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  About Us
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Careers
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Press Releases
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <ul>
                <li className="my-3 font-medium">Connect with Us</li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Facebook
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Twitter
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Instagram
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <ul>
                <li className="my-3 font-medium">Make Money with Us</li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Sell on Benalave
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Sell under Benalave Accelerator
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Protect and Build Your Brand
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Benalave Global Selling
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Become an Affiliate
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Fulfilment by Benalave
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Advertise Your Products
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <ul>
                <li className="my-3 font-medium">COVID-19 and Benalave</li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  COVID-19 and Benalave
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Your Account
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Returns Centre
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  100% Purchase Protection
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Benalave App Download
                </li>
                <li className="secondaryText mt-2 hover:underline cursor-pointer">
                  Help
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-5 hidden md:block bg-gray-50" />

          <div className="hidden md:block paddings">
            <div className=" flex flex-col justify-center items-center ">
              <div>
                <img className="w-auto h-8" src={logo} alt="" />
              </div>
              <div>
                <ul className="flex flex-wrap justify-center items-center gap-3 secondaryText my-5">
                  <li>Australia</li>
                  <li>Brazil</li>
                  <li>Canada</li>
                  <li>China</li>
                  <li>France</li>
                  <li>Germany</li>
                  <li>Italy</li>
                  <li>Japan</li>
                  <li>Mexico</li>
                  <li>Netherlands</li>
                  <li>Poland</li>
                  <li>singapore</li>
                  <li>Spain</li>
                  <li>Turkey</li>
                  <li>UAE</li>
                  <li>UK</li>
                  <li>US</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
