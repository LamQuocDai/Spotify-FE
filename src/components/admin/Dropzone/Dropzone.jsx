import { useEffect, useState } from "react";
import { Flex, Group, Image, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

const ImageDropzone = ({ onUpload, disabled, object }) => {
  const [preview, setPreview] = useState(null);

  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onUpload(file);
    }
  };

  useEffect(() => {
    if (object && object.image) {
      setPreview(object.image);
    }
  }, [object]);

  const handleReject = (files) => {
    // No notification or error handling here
  };

  return (
    <Flex direction="column" align="center">
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
        disabled={disabled}
        h={200}
        w="100%"
        styles={{
          inner: {
            height: "100%",
          },
        }}
      >
        {preview ? (
          <Image radius="md" h="100%" fit="contain" src={preview} />
        ) : (
          <Group
            justify="center"
            gap="xl"
            style={{ pointerEvents: "none" }}
            className="h-full"
          >
            <Flex direction="column" align="center" justify="center">
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline ta="center" mt="md">
                  <Dropzone.Accept>Drop image here</Dropzone.Accept>
                  <Dropzone.Reject>Image file less than 5mb</Dropzone.Reject>
                  <Dropzone.Idle>Upload avatar</Dropzone.Idle>
                </Text>
                <Text size="sm" c="dimmed" inline mt={7} ta="center">
                  Drag image here or click to select
                </Text>
              </div>
            </Flex>
          </Group>
        )}
      </Dropzone>
    </Flex>
  );
};

export default ImageDropzone;
