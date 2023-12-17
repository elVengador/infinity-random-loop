import { SelectedList } from "../App";

export type Lists = { [key: string]: { value: string[]; label: string } };

type ListsSelectorProps = {
  lists: Lists;
  value: SelectedList | null;
  onChange: (value: SelectedList | null) => void;
  backgroundColor: string;
  color: string;
  defaultValue?: string;
};

export const ListsSelector = ({
  lists,
  value,
  defaultValue,
  onChange,
  backgroundColor,
  color,
}: ListsSelectorProps) => {
  const onChangeLists = (value: string) => {
    const titleList = lists[value];
    if (!titleList) return;

    const selectedList: SelectedList = { value, label: titleList.label };
    onChange(selectedList);
  };

  return (
    <div
      style={{
        border: "none",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <select
        id=""
        value={value ? value.value : undefined}
        defaultValue={defaultValue}
        onChange={(e) => onChangeLists(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          background: backgroundColor,
          fontSize: "16px",
          color: color,
          border:"none",
          cursor: "pointer",
        }}
      >
        {Object.keys(lists).map((key, idx) => (
          <option
            style={{ background: backgroundColor, color: color }}
            key={idx}
            value={key}
          >
            {lists[key]["label"]}
          </option>
        ))}
      </select>
    </div>
  );
};
