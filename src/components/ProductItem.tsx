import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


type ProductItemProps = {
  producto: string;
  imagen?: string | null;
  ubicacion?: {
    latitude: number;
    longitude: number;
  } | null;
  onDelete: () => void;
};

export default function ProductItem({
  producto,
  imagen,
  ubicacion,
  onDelete,
}: ProductItemProps) {
  return (
    <View style={styles.productCard}>


      {imagen && (
    <Image
      source={{ uri: imagen }}
      style={styles.productImage}
    />
  )}

      <Text style={styles.productName}>
        🛒 {producto}
      </Text>

{ubicacion && (
  <Text style={styles.locationText}>
    📍 {ubicacion.latitude.toFixed(5)}, {ubicacion.longitude.toFixed(5)}
  </Text>
)}


      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButton}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
productImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 12,
},

locationText: {
  fontSize: 12,
  color: '#7A9B8A',
  marginTop: 4,
},
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
