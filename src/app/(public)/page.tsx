"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';

import Button from "../_components/button";
import Input from "../_components/input";
import { Container } from "./styles";
import { useAuth } from '@/hooks/use-login';
import { LoginFormValues, loginSchema } from '@/schemas/login';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, selectTenant, getStoredData, isLoading, error: apiError } = useAuth();

  const [view, setView] = useState<'login' | 'tenant'>('login');
  const [data, setData] = useState<{ token: string | null; empresas: any[] }>({ token: null, empresas: [] });
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  useEffect(() => {
    const stored = getStoredData();
    const hasTokenUrl = searchParams.get('token');

    // Se tem intenção de entrar (token na URL) mas o storage está limpo
    // ou se não tem nada em nenhum dos dois: limpa a URL e volta pro login
    if (!stored.token || stored.empresas.length === 0) {
      if (hasTokenUrl) {
        router.replace('/'); // Limpa o ?token= da URL
      }
      setView('login');
      return;
    }

    // Se chegou aqui, os dados existem no storage
    setData(stored);
    setView('tenant');
    if (stored.empresas.length > 0) {
      setSelectedTenantId(stored.empresas[0].id);
    }
  }, [searchParams, getStoredData, router]);

  const onSubmitLogin = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenantId) return;
    try {
      await selectTenant(selectedTenantId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <div className="form-side">
        {view === 'login' ? (
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <Input
              {...register('email')}
              type="email"
              label="E-mail"
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              label="Senha"
              error={errors.password?.message}
            />
            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Continuar'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleConfirmTenant} className="tenant-selection">
            <h2>Selecione a Empresa</h2>
            <select
              value={selectedTenantId}
              onChange={(e) => setSelectedTenantId(e.target.value)}
              disabled={isLoading}
              className="select-tenant" // Adicione seu estilo aqui
            >
              <option value="" disabled>Selecione uma opção</option>
              {data.empresas.map((empresa: any) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nome}
                </option>
              ))}
            </select>

            {apiError && <p style={{ color: 'red' }}>{apiError}</p>}

            <Button type="submit" disabled={isLoading || !selectedTenantId}>
              {isLoading ? 'Acessando...' : 'Entrar na Unidade'}
            </Button>

            {/* Botão opcional para voltar se o usuário quiser trocar de conta */}
            <button
              type="button"
              onClick={() => {
                sessionStorage.clear();
                router.replace('/');
              }}
              style={{ marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
            >
              Voltar para o login
            </button>
          </form>
        )}
      </div>
      <div className="bg-side"></div>
    </Container>
  );
}