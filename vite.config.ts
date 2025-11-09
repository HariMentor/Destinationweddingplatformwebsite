
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'react-hook-form@7.55.0': 'react-hook-form',
        'package@1.0.0': 'package',
        'figma:asset/d0d8526022e21349487e00b57498708013a7bb90.png': path.resolve(__dirname, './src/assets/d0d8526022e21349487e00b57498708013a7bb90.png'),
        'figma:asset/c8dfa6312c2d8ae9f9373b8ebeb680371e67d3a1.png': path.resolve(__dirname, './src/assets/c8dfa6312c2d8ae9f9373b8ebeb680371e67d3a1.png'),
        'figma:asset/bdc4e9e798bb7e15ae87fe31c13c5b3cc6d31461.png': path.resolve(__dirname, './src/assets/bdc4e9e798bb7e15ae87fe31c13c5b3cc6d31461.png'),
        'figma:asset/b78e2ee003a445e5490ad4eaa4beb3a74459d6bb.png': path.resolve(__dirname, './src/assets/b78e2ee003a445e5490ad4eaa4beb3a74459d6bb.png'),
        'figma:asset/97bc1b6aa953956f53f6c2781b82f9950a4609b9.png': path.resolve(__dirname, './src/assets/97bc1b6aa953956f53f6c2781b82f9950a4609b9.png'),
        'figma:asset/93eab2e4591129a0da8f52c9f1a7d572f9687906.png': path.resolve(__dirname, './src/assets/93eab2e4591129a0da8f52c9f1a7d572f9687906.png'),
        'figma:asset/5be7b30f1023e0bec0dfa8fb71138b45f6a9580f.png': path.resolve(__dirname, './src/assets/5be7b30f1023e0bec0dfa8fb71138b45f6a9580f.png'),
        'figma:asset/599d5437ff6f71a7522170940c3ac66332ac8d2f.png': path.resolve(__dirname, './src/assets/599d5437ff6f71a7522170940c3ac66332ac8d2f.png'),
        'figma:asset/4f2465dafa9cf98505aee683a11cee00c358c509.png': path.resolve(__dirname, './src/assets/4f2465dafa9cf98505aee683a11cee00c358c509.png'),
        'figma:asset/4f1ac6b99571c17f5174483992ddbfb998e97efe.png': path.resolve(__dirname, './src/assets/4f1ac6b99571c17f5174483992ddbfb998e97efe.png'),
        'figma:asset/4df447f25c9b58a49866bd51dae57eeaf8e22ba8.png': path.resolve(__dirname, './src/assets/4df447f25c9b58a49866bd51dae57eeaf8e22ba8.png'),
        'figma:asset/3e44cc82c69df7b9e4b510c71fff0a209463d571.png': path.resolve(__dirname, './src/assets/3e44cc82c69df7b9e4b510c71fff0a209463d571.png'),
        'figma:asset/32e1459ae49e57046b9c9bf320fe245919168bb0.png': path.resolve(__dirname, './src/assets/32e1459ae49e57046b9c9bf320fe245919168bb0.png'),
        'figma:asset/1119f8e879b2e4cb46bd33155639a62530f9a579.png': path.resolve(__dirname, './src/assets/1119f8e879b2e4cb46bd33155639a62530f9a579.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });