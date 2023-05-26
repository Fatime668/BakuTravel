import { useContext, useEffect, useState } from "react";
import { FirstLoginContext } from "../../context/FirstLoginContext";
import { getUserCategories } from "../../utils/UserSavedCategories";
import TabMain from "../../navigation/tab/TabMain";
import StartStack from "../../navigation/stacks/StartStack";

const OpenScreen = () => {

    const [loading, setloading] = useState<boolean>(true);

    let { firstLogin, setFirstLogin } = useContext(FirstLoginContext);

    useEffect(() => {

        getUserCategories()
            .then((res:any) => {
                if (res) {
                    setFirstLogin(false)
                    setloading(false);
                }
                else {
                    setFirstLogin(true);
                    setloading(false);
                }
            })

    }, [])

    if (loading) {
        return <></>
    }
    else {

        if (firstLogin)
            return <StartStack />
        else
            return <TabMain/>
    }
}

export default OpenScreen