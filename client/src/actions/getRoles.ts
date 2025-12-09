interface RoleProps {
    name: string
    value: string
}
const roles: RoleProps[] = [
    { name: "User", value: "User" },
    { name: "Trainer", value: "Trainer" },
];


const useRoles = () => {
    const role = roles.map((r) => { return r })
    return role;
}

export default useRoles;