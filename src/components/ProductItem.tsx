import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProductItemProps = {
  producto: string;
  onDelete: () => void;
};

export default function ProductItem({
  producto,
  onDelete,
}: ProductItemProps) {
  return (
    <View style={styles.productCard}>
      <Text style={styles.productName}>
        🛒 {producto}
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButton}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productName: {
    fontSize: 16,
    color: '#444444',
  },

  deleteButton: {
    fontSize: 20,
  },
});
