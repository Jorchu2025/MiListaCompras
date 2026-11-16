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
  contacto?: string | null;
};

export default function ProductItem({
  producto,
  imagen,
  ubicacion,
  contacto,
  onDelete,
}: ProductItemProps) {
  return (
    <View style={styles.productCard}>

      <View style={styles.productInfo}>

        <View style={styles.topRow}>

          {imagen && (
            <Image
              source={{ uri: imagen }}
              style={styles.productImage}
            />
          )}

          <View style={styles.textContainer}>
            <Text style={styles.productName}>
              🛒 {producto}
            </Text>

            {ubicacion && (
              <Text style={styles.locationText}>
                📍 {ubicacion.latitude.toFixed(5)},{' '}
                {ubicacion.longitude.toFixed(5)}
              </Text>
            )}

            {contacto && (
              <Text style={styles.contactText}>
                👤 Contacto: {contacto}
              </Text>
            )}
          </View>

        </View>

      </View>

      <TouchableOpacity
        style={styles.deleteButtonContainer}
        onPress={onDelete}
      >
        <Text style={styles.deleteButton}>🗑</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
  },

  productName: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 3,
  },

  locationText: {
    fontSize: 12,
    color: '#7A9B8A',
    marginTop: 2,
  },

  contactText: {
    fontSize: 12,
    color: '#7A9B8A',
    marginTop: 2,
  },

  deleteButtonContainer: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  deleteButton: {
    fontSize: 22,
  },
});