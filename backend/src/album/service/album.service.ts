import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlbumRepository } from "../album.repository";
import { GroupRepository } from "src/group/group.repository";
import { CreateAlbumRequestDto } from "src/dto/album/createAlbumRequest.dto";
import { UpdateAlbumInfoRequestDto } from "src/dto/album/updateAlbumInfoRequest.dto";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
  ) {}

  async createAlbum(createAlbumRequestDto: CreateAlbumRequestDto): Promise<string> {
    const { groupId, albumName } = createAlbumRequestDto;
    const group = await this.groupRepository.findOne({ groupId });
    if (!group) throw new NotFoundException(`Not found group with the id ${groupId}`);

    const album = await this.albumRepository.save({
      albumName: albumName,
      base: false,
      group: group,
    });

    return album.albumName;
  }

  async updateAlbumInfo(albumId: number, updateAlbumInfoRequestDto: UpdateAlbumInfoRequestDto): Promise<string> {
    const { albumName } = updateAlbumInfoRequestDto;
    const album = await this.albumRepository.findOne({ albumId });
    if (!album) throw new NotFoundException("Can not find Album");

    album.albumName = albumName;
    this.albumRepository.save(album);

    return "AlbumInfo update success!!";
  }

  async deleteAlbum(albumId: number): Promise<string> {
    const album = await this.albumRepository.findOne(albumId);
    if (!album) throw new NotFoundException("Can not find Album");

    this.albumRepository.softDelete({ albumId });

    return "Album delete success!!";
  }
}
