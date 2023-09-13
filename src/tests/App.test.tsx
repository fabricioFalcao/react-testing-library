import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente App', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    screen.getByRole('link', { name: /home/i });
    screen.getByRole('link', { name: /about/i });
    screen.getByRole('link', { name: /favorite pokémon/i });
  });

  test('A aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);

    const homeBtn = screen.getByRole('link', { name: /home/i });

    await user.click(homeBtn);

    screen.getByRole('heading', { name: /encountered pokémon/i });
  });

  test('A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { user } = renderWithRouter(<App />);

    const aboutBtn = screen.getByRole('link', { name: /about/i });

    await user.click(aboutBtn);

    screen.getByRole('heading', { name: /about pokédex/i });
  });

  test('A aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);

    const favoriteBtn = screen.getByRole('link', { name: /favorite pokémon/i });

    await user.click(favoriteBtn);

    screen.getByRole('heading', { name: /favorite pokémon/i });
  });

  test('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/pitty' });

    screen.getByRole('heading', { name: /page requested not found/i });
  });
});
