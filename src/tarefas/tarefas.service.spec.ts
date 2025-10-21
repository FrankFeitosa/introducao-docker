import { Test, TestingModule } from '@nestjs/testing';
import { TarefasService } from './tarefas.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  tarefa: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
};

describe('TarefasService', () => {
  let service: TarefasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarefasService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<TarefasService>(TarefasService);
  });

  it('deve listar todas as tarefas', async () => {
    const tarefas = [{ id: '1', titulo: 'Tarefa 1', descricao: 'Descrição 1' }];
    mockPrisma.tarefa.findMany.mockResolvedValue(tarefas);
    expect(await service.findAll()).toBe(tarefas);
  });

  it('deve encontrar uma tarefa por ID', async () => {
    const tarefa = { id: '1', titulo: 'Tarefa 1', descricao: 'Descrição 1' };
    mockPrisma.tarefa.findUnique.mockResolvedValue(tarefa);
    expect(await service.findOne('1')).toBe(tarefa);
  });

  it('deve lançar erro se tarefa não for encontrada', async () => {
    mockPrisma.tarefa.findUnique.mockResolvedValue(null);
    await expect(service.findOne('999')).rejects.toThrow('Tarefa com ID 999 não encontrado');
  });

  it('deve criar uma nova tarefa', async () => {
    const novaTarefa = {
      nome_tarefa: 'Nova Tarefa',
      responsavel: 'Fulano',
      data_entrega: '2025-01-01',
      objetivo: 'Objetivo de teste'
    };
    const tarefaCriada = { id: '1', ...novaTarefa };
    mockPrisma.tarefa.create.mockResolvedValue(tarefaCriada);
    expect(await service.create(novaTarefa as any)).toBe(tarefaCriada);
  });

  it('deve atualizar uma tarefa existente', async () => {
    const tarefaAtualizada = { id: '1', titulo: 'Tarefa Atualizada', descricao: 'Descrição Atualizada' };
    mockPrisma.tarefa.findUnique.mockResolvedValue(tarefaAtualizada);
    mockPrisma.tarefa.update.mockResolvedValue(tarefaAtualizada);
    expect(await service.update('1', { titulo: 'Tarefa Atualizada', descricao: 'Descrição Atualizada' } as any)).toBe(tarefaAtualizada);
  });
  
  it('deve remover uma tarefa existente', async () => {
    const tarefaRemovida = { id: '1', titulo: 'Tarefa 1', descricao: 'Descrição 1' };
    mockPrisma.tarefa.delete.mockResolvedValue(tarefaRemovida);
    expect(await service.remove('1')).toBe(tarefaRemovida);
  });
});

