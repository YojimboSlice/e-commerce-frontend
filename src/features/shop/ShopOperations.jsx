import { Button, Chip, Option, Select } from "@material-tailwind/react";
import Filter from "../../ui/Filter";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ShopOperations = ({ options }) => {
  const { control, handleSubmit, watch } = useForm();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchParams, setSearchparams] = useSearchParams();

  const selectedFilter = watch("filter");

  function onSubmit(data) {
    if (!selectedFilters.includes(selectedFilter)) {
      setSelectedFilters([...selectedFilters, selectedFilter]);

      const selectedOption = options.find(
        (option) => option.value === selectedFilter,
      );

      searchParams.set(`filter${selectedOption.id}`, selectedFilter);

      setSearchparams(searchParams);
    }
  }

  function handleClose(filter) {
    setSelectedFilters(
      selectedFilters.filter((selectedFilter) => selectedFilter !== filter),
    );
    const selectedOption = options.find((option) => option.value === filter);

    searchParams.delete(`filter${selectedOption.id}`);
    setSearchparams(searchParams);
  }

  return (
    <div className="flex mx-6 mb-4 items-end">
      <div className="flex flex-col">
        <Controller
          name="filter"
          control={control}
          render={({ field }) => (
            <Filter>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Select variant="standard" label="Filter" {...field}>
                  {options.map((option) => (
                    <Option
                      value={option.value}
                      option={option}
                      key={option.value}
                    >
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </form>
            </Filter>
          )}
        />
        <Button
          className="rounded-xl my-4 text-xs w-1/2 justify-center h-1/2"
          size="sm"
          variant="outlined"
          value="apply filters"
          type="submit"
          onClick={(d) => handleSubmit(onSubmit(d))}
        >
          set filter
        </Button>
      </div>
      <div className="flex h-1/2 gap-x-2">
        {selectedFilters &&
          selectedFilters.map((filter) => (
            <Chip
              open={selectedFilters.includes(filter)}
              value={filter}
              variant="ghost"
              animate={{
                mount: { y: 0 },
                unmount: { y: 50 },
              }}
              onClose={() => handleClose(filter)}
            />
          ))}
        {/* {options.map((option) => (
          <Chip
            open={selectedFilters.includes(option.value)}
            value={option.value}
            variant="ghost"
            animate={{
              mount: { y: 0 },
              unmount: { y: 50 },
            }}
            onClose={() => handleClose(option.value)}
          />
        ))} */}
      </div>
    </div>
  );
};
export default ShopOperations;
