import { Flex, Button, Text, Loader } from '@fluentui/react-northstar';
import { useMsal } from "@azure/msal-react";
import {Link} from "react-router-dom";

const Login = props => {
    const { instance, accounts, inProgress } = useMsal();
    if (accounts.length > 0) {
        return (
            <Flex fill vAlign="center" hAlign="center" padding="padding.medium">
                <Flex column gap="gap.large">
                    <Text as="p" content={"Počet přihlášených účtů: " + accounts.length} />
                    <Button onClick={() => instance.logout()}>Odhlásit</Button>
                </Flex>
            </Flex>
        )
    } else if (inProgress === "login") {
        return (
            <Flex fill vAlign="center" hAlign="center" padding="padding.medium">
                <Flex column gap="gap.large">
                    <Loader />
                    <Text as="p" content="Probíhá přihlašování." />
                </Flex>
            </Flex>
        )
    } else {
        return (
            <Flex fill vAlign="center" hAlign="center" padding="padding.medium">
                <Flex column gap="gap.large">
                    <Text as="p" content="Aktuálně není nikdo přihlášený." />
                    <Button primary onClick={() => instance.loginPopup()}>Přihlásit</Button>
                </Flex>
            </Flex>
        );
    }
}

export default Login;