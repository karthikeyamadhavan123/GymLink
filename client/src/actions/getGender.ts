import { GenderProps } from "@/types";
const genders: GenderProps[] = [
    {  name: "Male" },
    {  name: "Female" },
    {  name: "Others" },
]

const useGenders = () => {
    const gender = genders.map((g) => { return g })
    return gender;
}

export default useGenders;