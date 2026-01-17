import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PetCard } from './pet-card';
import { expect, within } from 'storybook/test';

const meta = {
  component: PetCard,
} satisfies Meta<typeof PetCard>;

export default meta;

type Story = StoryObj<typeof meta>;
//これはPetCardのデフォルトの表示を定義
export const Default: Story = {
  args: {
    pet: {/* ここにPet型のダミーデータを入れる */
      id: "1",
      name: "ペット1",
      type: "dog",
      hp: 50,
      ownerId: "1"
    }
  }
};

export const LongName: Story = {
  args: {
    pet: {
      "id": "1",
      "name": "ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1ペット1",
      "type": "dog",
      "hp": 50,
      "ownerId": "1"
    }
  }
};

export const ZeroHP: Story = {
  args: {
    pet: {
      "id": "1",
      "name": "ペット1",
      "type": "dog",
      "hp": 0,
      "ownerId": "1"
    }
  }
};

export const HPFull: Story = {
  args: {
    pet: {
      "id": "1",
      "name": "ペット1",
      "type": "dog",
      "hp": 100,
      "ownerId": "1"
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // ここでインタラクションテストを実行できます
    // 例: HPバーの色が緑であることを確認する
    // 例: HPのテキストが"100/100"であることを確認する
   await step("ラベルが100/100になっていること", async () => {
      //canvasのどこかに'100/100'というテキストがあることを確認すればいいので特定の要素を補足しなくてよい
      const hp = canvas.getByText('100/100');
      expect(hp).toBeVisible();
    });
    await step("HPバーの色が緑であること", async () => {
      //緑色になっていることを補足しないといけないのでroleで補足
      const hpBar = canvas.getByRole('progressbar');
      expect(hpBar).toHaveClass('bg-green-500');
    });
  }
};