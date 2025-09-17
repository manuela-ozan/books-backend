import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

/**
 * DTO that represents the information of a book exposed to the client
 */
export class BookDto {
  @ApiProperty({ description: 'Unique book ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Book title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Book authors', type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  authors: string[];

  @ApiProperty({ description: 'Publication date' })
  @IsString()
  publishedDate: string;

  @ApiProperty({ description: 'Thumbnail UR', required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;
}
