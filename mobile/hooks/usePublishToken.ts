import AsyncStorage from '@react-native-async-storage/async-storage';

export const publishToken = async (clerkSessionId : string | null) => {
    try{
    const response = await fetch("http://localhost:5001/api/publish-token", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerkSessionId }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.token; 
    console.log("JWT:", token);

    await AsyncStorage.setItem("token", data.token);


  } catch (err) {
    console.error(err);
  }
};