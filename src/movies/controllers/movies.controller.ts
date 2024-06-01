import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Res } from "@nestjs/common";
import { MoviesService } from "../services/movies.service";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/auth.guard";
import { PageMovie } from "../dto/page-movie.dto";
import { BasePaginationInput } from "../../common/pagination.object";
import { PageMovieInput } from "../dto/page-movie.input";
import { DefaultMessage } from "../../common/default-message";
import { Movie } from "../entities/movie.entity";
import { CacheService } from "../../cache/services/cache.service";

@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard)
@ApiTags("Movies")
@Controller({
    version: "1",
    path: "movies"
})
export class MoviesController {
    constructor(private readonly moviesService: MoviesService, private cacheService: CacheService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    @ApiOperation({ summary: "Create a new movie" })
    @ApiOkResponse({ type: Movie })
    async create(@Body() data: CreateMovieDto, @Res() res: any) {
        return res.status(200).json(await this.moviesService.create(data));
    }

    @UseGuards(JwtAuthGuard)
    @Get("list")
    @ApiOperation({ summary: "Retrieve a list of all movies" })
    @ApiOkResponse({ type: [Movie] })
    async findAll( @Res() res: any) {
        return res.status(200).json(await this.moviesService.findAll());
    }

    @UseGuards(JwtAuthGuard)
    @Get("get/:id")
    @ApiOperation({ summary: "Retrieve a specific movie by its ID" })
    @ApiOkResponse({ type: Movie })
    async findOne(@Param("id") id: string, @Res() res: any) {
        const cache = await this.cacheService.getCache(`movie-${id}`);
        if (cache)
            return res.status(200).json(cache);
        return res.status(200).json(await this.moviesService.findOne(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    @ApiOperation({ summary: "Update a specific movie by its ID" })
    @ApiOkResponse({ type: Movie })
    async update(@Param("id") id: string, @Body() data: UpdateMovieDto, @Res() res: any) {
        return res.status(200).json(await this.moviesService.update(id, data));
    }

    @UseGuards(JwtAuthGuard)
    @Delete("remove/:id")
    @ApiOperation({ summary: "Delete a specific movie by its ID" })
    @ApiOkResponse({ type: DefaultMessage })
    async remove(@Param("id") id: string, @Res() res: any) {
        return res.status(200).json(await this.moviesService.remove(id));
    }

    @UseGuards(JwtAuthGuard)
    @Post("paginate")
    @ApiOperation({ summary: "Retrieve a paginated list of movies" })
    @ApiOkResponse({ type: PageMovie })
    async page(@Body() data: PageMovieInput, @Res() res: any) {
        return res.status(200).json(await this.moviesService.page(data));
    }
}
