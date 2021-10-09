import { Text, StyleSheet } from 'react-native';

export default function Tag({ content }) {
    return (
        <Text style={styles.tag} >{content}</Text>
    )
}

const styles = StyleSheet.create({
    tag: {

    }
})