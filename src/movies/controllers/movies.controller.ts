import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put} from '@nestjs/common';
import {MoviesService} from "../services/movies.service";
import {CreateMovieDto} from "../dto/create-movie.dto";
import {UpdateMovieDto} from "../dto/update-movie.dto";
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth/guards/auth.guard";
import {PageMovie} from "../dto/page-movie.dto";
import {BasePaginationInput} from "../../common/pagination.object";
import {PageMovieInput} from "../dto/page-movie.input";
import {DefaultMessage} from "../../common/default-message";
import {Movie} from "../entities/movie.entity";
import {CacheService} from "../../cache/services/cache.service";

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Movies')
@Controller({
  version: '1',
  path: 'movies'
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService,private cacheService: CacheService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiOkResponse({type: Movie})
  create(@Body() data: CreateMovieDto) {
    return this.moviesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'Retrieve a list of all movies' })
  @ApiOkResponse({type: [Movie]})
  findAll() {
    return this.moviesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a specific movie by its ID' })
  @ApiOkResponse({type: Movie})
  async findOne(@Param('id') id: string) {
    const cache = await this.cacheService.getCache(`movie-${id}`);
    if (cache)
      return cache;
    return this.moviesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a specific movie by its ID' })
  @ApiOkResponse({type: Movie})
  update(@Param('id') id: string, @Body() data: UpdateMovieDto) {
    return this.moviesService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOperation({ summary: 'Delete a specific movie by its ID' })
  @ApiOkResponse({type: DefaultMessage})
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('paginate')
  @ApiOperation({ summary: 'Retrieve a paginated list of movies' })
  @ApiOkResponse({type: PageMovie})
  page(@Body() data: PageMovieInput) {
    return this.moviesService.page(data);
  }
}
