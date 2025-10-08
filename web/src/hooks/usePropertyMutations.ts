'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyService } from '@/lib/api';
import { CreatePropertyRequest, UpdatePropertyRequest, Property } from '@/types/property';
import { toast } from 'sonner';

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyService.createProperty,
    onSuccess: (data) => {
      if (data.success && data.data) {
        // Invalidar todas as queries relacionadas a propriedades
        queryClient.invalidateQueries({ queryKey: ['properties'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'featured'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'recent'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'affordable'] });
        queryClient.invalidateQueries({ queryKey: ['home', 'stats'] });
        
        toast.success('Propriedade criada com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao criar propriedade');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || error.message || 'Erro ao criar propriedade');
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePropertyRequest }) => 
      propertyService.updateProperty(id, data),
    onSuccess: (data, variables) => {
      if (data.success && data.data) {
        // Invalidar todas as queries relacionadas a propriedades
        queryClient.invalidateQueries({ queryKey: ['properties'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'featured'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'recent'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'affordable'] });
        queryClient.invalidateQueries({ queryKey: ['home', 'stats'] });
        queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
        
        toast.success('Propriedade atualizada com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao atualizar propriedade');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || error.message || 'Erro ao atualizar propriedade');
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: propertyService.deleteProperty,
    onSuccess: (data, propertyId) => {
      if (data.success) {
        // Invalidar todas as queries relacionadas a propriedades
        queryClient.invalidateQueries({ queryKey: ['properties'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'featured'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'recent'] });
        queryClient.invalidateQueries({ queryKey: ['properties', 'affordable'] });
        queryClient.invalidateQueries({ queryKey: ['home', 'stats'] });
        queryClient.removeQueries({ queryKey: ['property', propertyId] });
        
        toast.success('Propriedade excluída com sucesso!');
      } else {
        toast.error(data.error || 'Erro ao excluir propriedade');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || error.message || 'Erro ao excluir propriedade');
    },
  });
}

export function usePropertyById(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await propertyService.getPropertyById(id);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error('Erro ao carregar propriedade');
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
}

export function useUserProperties(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['properties', 'user', page, limit],
    queryFn: async () => {
      const response = await propertyService.getUserProperties(page, limit);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error('Erro ao carregar suas propriedades');
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
}
