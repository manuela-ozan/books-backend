import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

/**
 * DTO that represents the information of a book exposed to the client
 */
export class BookDto {
  @ApiProperty({ description: 'ID único del libro' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Título del libro' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Autores del libro', type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  authors: string[];

  @ApiProperty({ description: 'Fecha de publicación' })
  @IsString()
  publishedDate: string;

  @ApiProperty({ description: 'URL de la miniatura', required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}
