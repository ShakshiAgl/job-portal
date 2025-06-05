const filterData = [
  {
    filterType: 'Location',
    array: ['Kathmandu', 'Nepalgunj', 'Pokhara', 'Butwal', 'Birgunj'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full p-4 bg-white rounded-md">
      <h2 className="text-lg font-bold mb-4">Filter Jobs</h2>
      <div className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-sm mb-2">{section.filterType}</h3>
            <div className="space-y-2">
              {section.array.map((item, idx) => (
                <label key={idx} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={section.filterType}
                    value={item}
                    className="form-radio text-[#00707a] accent-[#00707a]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
