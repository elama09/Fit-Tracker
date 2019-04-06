import { AsyncStorage } from "react-native";

export const SaveWeight = async value => {
  // Get data and push new value to end
  let storedData = await GetWeightArray();
  if (storedData === null) {
    storedData = [];
    storedData.push(value);
  } else {
    storedData.push(value);
  }
  // Save updated data to storage
  try {
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
    return true;
  } catch (error) {
    // TODO handeError
  }
};

export const GetWeightArray = async () => {
  try {
    const response = await AsyncStorage.getItem("Weight");
    const weightArray = await JSON.parse(response);
    if (!weightArray) {
      return [];
    }
    return weightArray;
  } catch (error) {
    // TODO handeError
  }
};

export const ClearAllWeights = async () => {
  try {
    await AsyncStorage.removeItem("Weight");
  } catch (error) {}
};

export const DeleteWeight = async (weight) => {
  const storedData = await GetWeightArray();
  const index = storedData.findIndex(x => x.time == weight.time);
  storedData.splice(index, 1)
  // Save data back
  try {
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
    return true;
  } catch (error) {
    // TODO handeError
  }
}

// TODO 
export const EditWeight = async (chosenWeight, newValue) => {
  const storedData = await GetWeightArray();
  const foundWeight = storedData.find(x => x.time == chosenWeight.time);
  // Edit weight!
  foundWeight.weight = newValue;
  // Save data back
  try {
    await AsyncStorage.setItem("Weight", JSON.stringify(storedData));
    return true;
  } catch (error) {
    // TODO handeError
  }
}

export const SaveProfile = async (newProfile) => {
  try {
    await AsyncStorage.setItem("Profile", JSON.stringify(newProfile));
  } catch (error) {
    // TODO handeError
  }
}

export const GetProfile = async () => {
  try {
    const response = await AsyncStorage.getItem("Profile");
    return response ? JSON.parse(response) : response;
  } catch (error) {
    // TODO handeError
  }
};

export const ClearProfile = async () => {
  try {
    await AsyncStorage.removeItem("Profile");
    await AsyncStorage.removeItem("FirstLaunch"); // for testing ONLY
  } catch (error) {}
};

export const FirstLaunchCompleted = async () => {
  try {
    await AsyncStorage.setItem("FirstLaunch", 'false');
  } catch (error) {
    // TODO handeError
  }
}

export const GetFirstLaunch = async () => {
  try {
    const response = await AsyncStorage.getItem("FirstLaunch");
    return response;
  } catch (error) {
    // TODO handeError
  }
};