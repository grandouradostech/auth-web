"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, useRouter } from 'next/navigation';
import { FileText, HelpCircle, Shield, LayoutGrid } from 'lucide-react';

import Button from "../_components/button";
import Input from "../_components/input";
import { Container, FormSide, BgSide } from "./styles";
import { useAuth } from '@/hooks/use-login';
import { LoginFormValues, loginSchema } from '@/schemas/login';


export default function Login() {
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

    if (!stored.token || stored.empresas.length === 0) {
      if (hasTokenUrl) {
        router.replace('/');
      }
      setView('login');
      return;
    }

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
      <FormSide>
        <div className="content-wrapper">
          {view === 'login' ? (
            <>
              <div>
                <h1>ACESSE O <i>GD HUB</i></h1>
                <p className="subtitle">Entre com suas credenciais para continuar.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitLogin)}>
                <Input
                  {...register('email')}
                  placeholder='exemplo@granddos.tech'
                  type="email"
                  label="E-mail Corporativo"
                  autoCapitalize='off'
                  autoFocus

                  autoComplete='email'
                  error={errors.email?.message}
                />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder='******'
                  label="Senha"
                  autoCapitalize='off'

                  autoComplete='current-password webauthn'
                  error={errors.password?.message}
                />

                <div className="form-options">
                  <label>
                    <input type="checkbox" /> Lembrar acesso
                  </label>
                  <a href="/forgot-password">Recuperar senha</a>
                </div>

                {apiError && <p className="error-message">{apiError}</p>}

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Autenticando...' : 'Acessar Conta'}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div>
                <h1>Selecione a Organização</h1>
                <p className="subtitle">Identificamos múltiplos vínculos para seu usuário.</p>
              </div>

              <form onSubmit={handleConfirmTenant}>
                <select
                  value={selectedTenantId}
                  onChange={(e) => setSelectedTenantId(e.target.value)}
                  disabled={isLoading}
                  className="select-tenant"
                >
                  <option value="" disabled>Selecione uma opção</option>
                  {data.empresas.map((empresa: any) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nome}
                    </option>
                  ))}
                </select>

                {apiError && <p className="error-message">{apiError}</p>}

                <Button type="submit" disabled={isLoading || !selectedTenantId}>
                  {isLoading ? 'Carregando ambiente...' : 'Entrar no Ambiente'}
                </Button>

                <button
                  type="button"
                  className="back-button"
                  onClick={() => {
                    sessionStorage.clear();
                    router.replace('/');
                    setView('login');
                  }}
                >
                  Voltar para login
                </button>
              </form>
            </>
          )}
        </div>

        <div className="presented-by">
          Desenvolvido por <strong>GDTECH</strong>
        </div>
      </FormSide>

      <BgSide>
        <div className="info-list">
          <div className="info-item">
            <div className="icon-box">
              <FileText size={24} strokeWidth={2} />
            </div>
            <div className="text-content">
              <h3>Documentação Técnica</h3>
              <p>Acesse manuais e especificações de API.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <HelpCircle size={24} strokeWidth={2} />
            </div>
            <div className="text-content">
              <h3>Gestão de Chamados</h3>
              <p>Abra e acompanhe solicitações de suporte.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <Shield size={24} strokeWidth={2} />
            </div>
            <div className="text-content">
              <h3>Controle de Acesso</h3>
              <p>Gerencie permissões e níveis de usuários.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="icon-box">
              <LayoutGrid size={24} strokeWidth={2} />
            </div>
            <div className="text-content">
              <h3>Ecossistema de Apps</h3>
              <p>Navegue entre os aplicativos integrados.</p>
            </div>
          </div>
        </div>
      </BgSide>
    </Container>
  );
}
