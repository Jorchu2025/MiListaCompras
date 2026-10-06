import { fireEvent, render } from '@testing-library/react-native';
import ProductItem from '../src/components/ProductItem';

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

test('muestra correctamente otro producto', async () => {
  const resultado = await render(
    <ProductItem
      producto="Arvejas"
      onDelete={() => {}}
    />
  );

  expect(resultado.getByText('🛒 Arvejas')).toBeTruthy();
});







