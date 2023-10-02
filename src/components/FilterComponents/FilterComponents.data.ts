interface optionItem {
    value: string;
    label: string;
}

export const statusOptions: optionItem[] = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'Unknown', label: 'Unknown' },
]

export const genderOptions: optionItem[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Genderless ', label: 'Genderless ' },
  { value: 'Unknown ', label: 'Unknown ' },
]