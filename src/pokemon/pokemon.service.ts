import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;

  constructor(
    //! este decorador fue creado por nest para poder injectar modelos
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService, //para obtener los valores del .env
  ) {
    this.defaultLimit = this.configService.get<number>('defaultlimit') ?? 10;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto; //si el limit viene lo toma, sino toma el 10

    return this.pokemonModel
      .find()
      .limit(limit!)
      .skip(offset)
      .sort({
        no: 1,
      })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    // por id
    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    //por mongo id
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    //por nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term ${term} search no exists`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    /*    

    !Eliminacion forma 1
    const pokemon = await this.findOne(id);
    await pokemon.deleteOne(); 

    !Eliminacion forma 2
    const result = await this.pokemonModel.findByIdAndDelete(id);
    */
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not fout`);
    }
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can not update pokemon-- Check server logs`,
    );
  }
}
