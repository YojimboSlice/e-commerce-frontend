import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function TabsDefault({ description, additionalInfo }) {
  const data = [
    { label: "Description", value: "description", desc: description },
    {
      label: "Additional Info",
      value: "additional info",
      desc: additionalInfo,
    },
  ];
  return (
    <>
      <Tabs id="custom-animation" value="description" className="w-full">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value} className="text-lg">
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}
