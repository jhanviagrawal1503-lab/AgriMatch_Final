function FilterBar({
  soil,
  setSoil,
  season,
  setSeason,
  budget,
  setBudget,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <label>Soil</label>
        <br />
        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Loamy">Loamy</option>
          <option value="Clay">Clay</option>
          <option value="Sandy">Sandy</option>
        </select>
      </div>

      <div>
        <label>Season</label>
        <br />
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
          <option value="Monsoon">Monsoon</option>
        </select>
      </div>

      <div>
        <label>Budget</label>
        <br />
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;