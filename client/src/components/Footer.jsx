import React from "react";
import Symbol from "../assets/symvol_logo_transparent.svg";
const Footer = () => {
  return (
    <footer class="bg-primary text-secondary">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="#" class="flex items-center">
              <img src={Symbol} class="h-8 me-3" alt="FlowBite Logo" />
              <span class="self-center text-2xl font-semibold">Funoon</span>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 class="mb-6 text-sm font-semibold uppercase">Resources</h2>
              <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                  <a href="https://flowbite.com/" class="hover:underline">
                    Funoon
                  </a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" class="hover:underline">
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold uppercase dark:text-white">
                Legal
              </h2>
              <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                  <a href="#" class="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-400 sm:mx-autolg:my-8" />
        <div class="flec items-center width-full text-center">
          <span class="text-sm text-center text-gray-500">
            © 2024{" "}
            <a href="#" class="hover:underline">
              Funoon
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
