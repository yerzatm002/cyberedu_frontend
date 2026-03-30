const ProgressBar = ({ value = 0 }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Орындалу деңгейі</span>
        <span className="text-sm font-semibold text-green-800">{value}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-green-100">
        <div
          className="h-full rounded-full bg-green-700 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar