export default function CycleNameInput({ index, name, onNameChange }) {
    return (
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
    );
  }
  