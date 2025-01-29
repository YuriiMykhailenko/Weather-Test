import { ChangeEvent, FormEvent, useState } from 'react';
import { useUpdateStores } from '../hooks/useUpdateStores';

export const AddCityForm = () => {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);

  const { addNewCity } = useUpdateStores();

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    if (isError) {
      setIsError(false);
    }

    setInput(e.currentTarget.value);
  }

  function handleAddCity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim()) {
      addNewCity(input.trim())
        ?.then(() => setInput(''))
        ?.catch(() => setIsError(true));
    }
  }

  return (
    <form
      onSubmit={handleAddCity}
      className="tablet-large:h350 relative flex flex-col justify-center gap-20 rounded-sm bg-blue-200 p-32 tablet:h-250 desktop:h-400"
    >
      <div className="h-12">
        <label className="text-red-800">
          {isError && 'Incorect City Name'}
        </label>
      </div>

      <input
        type="text"
        value={input}
        onChange={handleChangeInput}
        className="rounded-sm bg-blue-100 p-12 text-xlg"
        placeholder="Name of the city..."
      />
      <button className="rounded-sm bg-blue-300 p-12 text-xlg" type="submit">
        Add City
      </button>
    </form>
  );
};
