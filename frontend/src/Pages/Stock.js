import { React, useState } from "react";
import AddStock from "./AddStock";
import GrabItem from "./GrabItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UpdateStock from "./UpdateStock";
function Stock() {
  return (
    <div defaultActiveKey="home" id="stock" className="mb-3 ">
      <Tabs className="flex">
        <TabList className="flex flex-col justify-center h-screen w-fit">
          <Tab className="text-xl font-semibold bg-slate-300 shadow border-black rounded-2xl w-40 text-center m-4 p-3 text-white">
            <i class="fa-solid fa-plus me-2"></i>
            Add Stock
          </Tab>
          <Tab className="text-xl font-semibold bg-slate-300 shadow border-black rounded-2xl w-40 text-center m-4 p-3 text-white">
            <i class="fa-solid fa-hand me-3"></i>
            Grab Item
          </Tab>
          <Tab className="text-xl font-semibold bg-slate-300 shadow border-black rounded-2xl w-40 text-center m-4 p-3 text-white">
            <i class="fa-solid fa-wrench me-3"></i>
            Update
          </Tab>
        </TabList>
        <div className="ps-15 flex pt-20 ">
          <TabPanel>
            <AddStock />
          </TabPanel>
          <TabPanel>
            <GrabItem />
          </TabPanel>
          <TabPanel>
            <UpdateStock />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}

export default Stock;
