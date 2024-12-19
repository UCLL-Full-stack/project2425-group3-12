const getMemberByUsername = async (username: string) => {
    const storedUser = localStorage.getItem("loggedInUser");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/members/by-username/" + username, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const MemberService = { getMemberByUsername };

export default MemberService;