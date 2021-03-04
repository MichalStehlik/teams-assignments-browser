import { Flex, Text } from '@fluentui/react-northstar';
const NotFound = props => {
    return (
        <Flex fill vAlign="center" hAlign="center" padding="padding.medium">
            <Flex column gap="gap.large">
                <Text content="Tento obsah neexistuje." size="large" />
            </Flex>
        </Flex>
    )
}

export default NotFound;