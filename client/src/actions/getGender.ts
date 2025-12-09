 interface GenderProps {
  name: string
  value:string
}
const genders: GenderProps[] = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];


const useGenders = () => {
    const gender = genders.map((g) => { return g })
    return gender;
}

export default useGenders;