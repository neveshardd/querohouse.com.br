'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { UpdateProfileSchema, type UpdateProfileRequest } from '@/lib/api';
import { Button, Input, Label, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/basic';
import { Loader2, User, Mail, Phone, Image } from 'lucide-react';

/**
 * Componente de formulário de perfil seguindo princípios SOLID
 * Single Responsibility: Responsável apenas por exibir e gerenciar o formulário de perfil
 * Open/Closed: Fácil de estender com novas funcionalidades
 */
export function ProfileForm() {
  const { user, updateProfile, isUpdatingProfile } = useAuthContext();
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });
  const [errors, setErrors] = useState<Partial<UpdateProfileRequest>>({});

  // Preencher formulário com dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação com Zod
    try {
      const validatedData = UpdateProfileSchema.parse(formData);
      setErrors({});
      updateProfile(validatedData);
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        const fieldErrors: Partial<UpdateProfileRequest> = {};
        
        zodError.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof UpdateProfileRequest] = err.message;
          }
        });
        
        setErrors(fieldErrors);
      }
    }
  };

  const handleChange = (field: keyof UpdateProfileRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Meu Perfil
        </CardTitle>
        <CardDescription className="text-center">
          Atualize suas informações pessoais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={handleChange('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Telefone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={handleChange('phone')}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Avatar (URL)
            </Label>
            <Input
              id="avatar"
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              value={formData.avatar}
              onChange={handleChange('avatar')}
              className={errors.avatar ? 'border-red-500' : ''}
            />
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tipo de Conta</Label>
            <div className="p-3 bg-gray-50 rounded-md">
              <span className="capitalize font-medium">
                {user.role === 'user' && 'Comprador'}
                {user.role === 'corretor' && 'Corretor'}
                {user.role === 'proprietario' && 'Proprietário'}
                {user.role === 'incorporadora' && 'Incorporadora'}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Atualizando...
              </>
            ) : (
              'Atualizar Perfil'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
