import { fireEvent, render } from '@testing-library/react-native';
import ProductItem from '../src/components/ProductItem';
import { validarNombreProducto } from '../src/utils/productValidation';


test('muestra el nombre del producto', async () => {

 const resultado = await render(
  <ProductItem
    producto="Leche"
    onDelete={() => {}}
  />
);

expect(resultado.getByText('🛒 Leche')).toBeTruthy();
});


test('ejecuta onDelete al presionar eliminar', async () => {
  const onDelete = jest.fn();

  const resultado = await render(
    <ProductItem
      producto="Leche"
      onDelete={onDelete}
    />
  );

  fireEvent.press(resultado.getByText('🗑'));

  expect(onDelete).toHaveBeenCalled();
});

test('valida correctamente el nombre del producto', () => {
  expect(validarNombreProducto('Leche')).toBe(true);
  expect(validarNombreProducto('')).toBe(false);
  expect(validarNombreProducto('   ')).toBe(false);
});







